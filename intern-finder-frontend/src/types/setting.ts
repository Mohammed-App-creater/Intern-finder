
export interface BasicInfo {
  fullName: string,
  email: string,
  profileImageUrl: string,
  phoneNumber: string,
  gender: "male" | "female",
  dateOfBirth: Date
}

export interface Password {
  oldPassword: string,
  newPassword: string
}

export interface Notification {
  application : boolean,
  job: boolean,
  recommendation: boolean,
  alert: boolean
}