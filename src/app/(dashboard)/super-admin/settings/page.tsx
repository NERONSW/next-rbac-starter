const SETTINGS: ReadonlyArray<{ key: string; value: string }> = [
  { key: "Site name", value: "RouteShield" },
  { key: "Registration", value: "Invite only" },
  { key: "Default role", value: "user" },
  { key: "Session TTL", value: "24 hours" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Super admin only. Global configuration for the platform.
        </p>
      </header>

      <section className="flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800">
        {SETTINGS.map((setting, index) => (
          <div
            key={setting.key}
            className={`flex items-center justify-between px-5 py-4 ${
              index > 0
                ? "border-t border-zinc-200 dark:border-zinc-800"
                : ""
            }`}
          >
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {setting.key}
            </span>
            <span className="text-sm font-medium text-foreground">
              {setting.value}
            </span>
          </div>
        ))}
      </section>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        These values are static for the demo.
      </p>
    </div>
  );
}