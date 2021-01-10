$(document).ready(function(){
   function Nav(id){
      this.id = "#"+id;
      this.itemHeight = 17.6;
      this.transportLastItem = ()=>{ // transports last menu-item to expand menu
         let lastMenuItem = $(this.id+" .nav__expand").prev().clone().removeClass().addClass('nav__menu-item_expand');
         $(this.id+" .nav__expand").prev().remove();
         $(this.id+" .nav__expand-menu").append(lastMenuItem);
      };
      this.checkForTwoLinesItem = ()=>{
         let result = false;
         let itemHeight = this.itemHeight;
         $(this.id+" .nav__menu-item").each(function(){ // checks if there is any menu item that breaks on two lines
            if($(this).height() > itemHeight){
               result = true;
               return true;
            }
         });

         return result;
      };
      this.adaptize = () =>{
         let isMenuBroken = this.checkForTwoLinesItem();
         if(isMenuBroken){
            $(this.id+" .nav__expand-btn").addClass('show');
         }
   
         while(isMenuBroken){
            this.transportLastItem();
            isMenuBroken = this.checkForTwoLinesItem();
         }
      };

      let navId = this.id; 
      // adding a click functionality to buttons
      $(this.id+" .nav__toggler").click(function(){
         $(navId).toggleClass('nav_is-open');
      });

      $(this.id+" .nav__expand-btn").click(function(){
         $(this.id+" .nav__expand-menu").toggleClass('show');
      });
   }


      let topmenu = new Nav('topmenu');
      topmenu.adaptize();

});