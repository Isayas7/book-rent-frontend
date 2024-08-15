import { UserRole } from "@/utils/schema";
import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
    return defineAbility((can) => {
        if (user?.role === UserRole.ADMIN) {
            can("view", "dashboard");
            can("view", "books");
            can("view", "owners");
            can("view", "other");

        } else if (user?.role === UserRole.OWNER) {
            can("view", "dashboard");
            can("view", "bookUpload");
            can("view", "other");
        }
        can("view", "other");
        can("view", "notification");
        can("view", "settings");
        can("view", "loginAs");
    });
}

