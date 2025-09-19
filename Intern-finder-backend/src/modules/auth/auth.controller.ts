import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { getUser, githubClient, googleClient, handleOAuthLogin, login, } from "./auth.service";
import ENV from "../../config/env"





export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.status(200).json(successResponse(result));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message));
        } else {
            next(error);
        }
    }
}

export const getMe = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.user!;
        const user = await getUser(id, role);
        res.status(200).json(successResponse(user, "User fetched successfully"));
    } catch (error){
        next(error);
    }
}


export const google = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationUri = googleClient.authorizeURL({
            redirect_uri: ENV.GOOGLE_REDIRECT_URI!,
            scope: ["openid", "profile", "email"].join(" "),
        });
        res.redirect(authorizationUri);
    } catch (error) {
        next(error);
    }
}


export const github = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationUri = githubClient.authorizeURL({
            redirect_uri: process.env.GITHUB_CALLBACK_URL!,
            scope: "read:user user:email",
        });
        res.redirect(authorizationUri);
    } catch (error) {
        next(error);
    }
}


export const googleCallbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.query;
        const options = {
            code: code as string,
            redirect_uri: ENV.GOOGLE_REDIRECT_URI!,
        };

        const accessToken = await googleClient.getToken(options);
        const { data: profile } = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            { headers: { Authorization: `Bearer ${accessToken.token.access_token}` },  }
        );

        const token = await handleOAuthLogin("google", profile);
        console.log("Google OAuth token:", profile);
        res.redirect(`${ENV.FRONTEND_URL}?token=${token}`);

    } catch (error) {
        next(error);
    }
}

export const githubCallbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.query;
        const options = {
            code: code as string,
            redirect_uri: process.env.GITHUB_CALLBACK_URL!,
        };

        const accessToken = await githubClient.getToken(options);
        const { data: profile } = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken.token.access_token}` },
        });

        // GitHub requires extra call for email
        let email = profile.email;
        if (!email) {
            const { data: emails } = await axios.get("https://api.github.com/user/emails", {
                headers: { Authorization: `Bearer ${accessToken.token.access_token}` },
            });
            email = emails.find((e: any) => e.primary)?.email;
        }

        profile.email = email;

        const token = await handleOAuthLogin("github", profile);
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (error) {
        next(error);
    }
}