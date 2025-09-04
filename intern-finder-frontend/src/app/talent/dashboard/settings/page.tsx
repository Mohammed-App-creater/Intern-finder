import SettingTabs from "@/components/pages/dashboard/talent/settings/setting-tabs";

export default function Setting() {
  return (
    <div className="min-h-screen p-8 mt-2">
      <h1 className="text-3xl font-bold text-dark font-['Clash_Display'] mb-10">
        Settings
      </h1>
      <SettingTabs />
    </div>
  );
}
