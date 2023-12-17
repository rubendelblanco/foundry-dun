export default class DUNPlayerSheet extends ActorSheet {
    // Override Default Options, Set CSS Classes, Set Default Sheet, Set up Sheet Tabs
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        width: 490,
        height: 690,
        template: "systems/dun/templates/actors/dun-npc-sheet.html",
        classes: ["dun", "sheet", "actor"],
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".content", initial: "tab1" }]
      });
    }
  
    // Make the data available to the sheet template
    async getData() {
      const context = super.getData();
      const actorData = this.actor.toObject(false);
      context.system = actorData.system;
      return context;
    } 
  
  }
  