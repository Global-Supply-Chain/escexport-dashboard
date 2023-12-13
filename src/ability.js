import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function defineAbilityFor(ability) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    
    if (ability?.role === "SUPER_ADMIN") {
        if(ability?.permission?.length > 0)
        {
            can(ability?.permission);
        }
    //   can("create", "all");
    }

    if(ability?.role === "GENERAL_MANAGER") {
        can(ability?.permission)
        // can(ability?.permission);
    }

    if (ability?.role === "EDITOR") {
      can("manage", "article");
    }
  
  
    return build()
};