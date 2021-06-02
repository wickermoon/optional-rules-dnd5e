export const RegisterSettings = async function(moduleName) {

    // Settings for critical hit and fumble tables
    await game.settings.register(moduleName, 'use-crit-hit-fumble', {
        name: "Use Critical hit and fumble rules",
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: debounceReload
    });

    await game.settings.register(moduleName, 'crit-hit-rolltable', {
        name: "Critical hit rolltable",
        scope: 'world',
        config: true,
        type: String,
        onChange: tableExists
    });

    await game.settings.register(moduleName, 'crit-fumble-rolltable', {
        name: "Critical fumble rolltable",
        scope: 'world',
        config: true,
        type: String,
        onChange: tableExists
    });
    
    // Settings for Hero Points
    await game.settings.register(moduleName, 'use-hero-points', {
        name: "Use Hero Points",
        scope: 'world',
        config: true,
        type: String,
        onChange: debounceReload
    });

    // Settings for proficiency die 
    await game.settings.register(moduleName, 'use-prof-die', {
        name: "Use Proficiency die rules",
        scope: 'world',
        config: true,
        type: String,
        onChange: debounceReload
    });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Helper Functions 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const tableExists = function (tableName) {
    let rollTable = game.tables.getName(tableName);
    if (rollTable == undefined) {
        ui.notifications.error(`Optional Rules Dnd5e | RollTable named ${tableName} not found.`)
    }
};

const debounceReload = debounce(() => window.location.reload(), 100);