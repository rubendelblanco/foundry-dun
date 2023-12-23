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
      super.activateListeners(html);
  
      // Delete Inventory Item
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        var theItem = this.actor.items.get(li.data("itemId"));
        
        if (theItem.system.attributes.weight !== undefined){
          this.actor.system.weight -= theItem.system.attributes.weight;
          this.actor.system.weight = this.actor.system.weight < 0 ? 0 : this.actor.system.weight;

          this.actor.update({"system.weight":this.actor.system.weight})
        }

        theItem.delete();
      });

      /**
       * Add weight equipment when item is dropped in character
       */
      Hooks.once("dropActorSheetData", (actor, sheet, data) => {
        var weightInPC = 0;
        actor.items.forEach(item => {
          if (item.system.attributes.weight !== undefined || item.system.attributes.weight > 0) {
            weightInPC += item.system.attributes.weight;
          }
        });

        var newItemId = data['uuid'];
        newItemId = newItemId.replace('Item.','');
        weightInPC += Item.get(newItemId).system.attributes.weight;
        actor.update({"system.weight":weightInPC})
      });

    }
  
  }
  