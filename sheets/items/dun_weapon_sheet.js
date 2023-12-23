// Our Item Sheet extends the default
export default class DUNWeaponSheet extends ItemSheet {
    template = "systems/dun/templates/items/dun-weapon-sheet.html";

    // Set the height and width
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        width: 530,
        height: 440,
        template: "systems/dun/templates/items/dun-weapon-sheet.html",
        classes: ["dun", "sheet", "item"],
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".content", initial: "description" }]
      });
    }
  
    // If our sheet is called here it is.
    get template() {
      return this.template;
    }

    getEffects(){
      return [{key: "tohit-minus-1", label: "To hit -1"}, {key: "b", label: "To hit +1"}]
    }
  
    // Make the data available to the sheet template
    async getData() {
      const baseData = await super.getData();
      baseData.item.system.attributes.effects = this.getEffects()
  
      let enrichedDescription = await TextEditor.enrichHTML(this.item.system.description, {async: true});
  
      let sheetData = {
        owner: this.item.isOwner,
        editable: this.isEditable,
        item: baseData.item,
        system: baseData.item.system,
        config: CONFIG.dun,
        enrichedDescription: enrichedDescription
      };
  
      return sheetData;
    }

    activateListeners(html) {
      console.log('items activate listeners')
      super.activateListeners(html);
  
      $('.item-image').hover(function(){
        $(this).addClass('item-transition');
      },function(){
          $(this).removeClass('item-transition');   
      });
    }

  }
  