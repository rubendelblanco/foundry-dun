import { DUNActor } from "./module/documents/actor.js";

import DUNPlayerSheet from "./sheets/actors/dun_player_sheet.js";
import DUNWeaponSheet from "./sheets/items/dun_weapon_sheet.js";
import DUNNPCSheet from "./sheets/actors/dun_npc_sheet.js";

CONFIG.Actor.documentClass = DUNActor;

Actors.unregisterSheet("core", ActorSheet);
Items.unregisterSheet("core", ItemSheet);
Actors.registerSheet("dun", DUNPlayerSheet, {makeDefault: true, label: "dun.entity_sheet.player_character", types: ["character"]});
Actors.registerSheet("dun", DUNNPCSheet, {makeDefault: true, label: "dun.entity_sheet.npc_character", types: ["npc"]});
items = Items.registerSheet("dun", DUNWeaponSheet, {makeDefault: true, label: "dun.entity_sheet.weapon", types: ["weapon"]});

DUNActor.activateListeners(items);



