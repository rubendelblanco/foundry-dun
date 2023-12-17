export default class DUNPlayerSheet extends ActorSheet {
    // Override Default Options, Set CSS Classes, Set Default Sheet, Set up Sheet Tabs
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        width: 490,
        height: 690,
        template: "systems/dun/templates/actors/dun-character-sheet.html",
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

    activateListeners(html) {
      console.log('activate listeners')
      super.activateListeners(html);
  
      // Everything below here is only needed if the sheet is editable
      //if (!this.options.editable) return;
  
      // Delete Inventory Item
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        var theItem = this.actor.items.get(li.data("itemId"));
        theItem.delete();
      });
    }
  
  }
  