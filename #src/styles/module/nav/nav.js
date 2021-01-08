$(document).ready(function(){
   if($(window).width() > 992){ // works only on pc screens

      $("#topmenu .nav__toggler").click(function(){
         $("#topmenu").toggleClass('nav_is-open');
      });

      $("#topmenu .nav__expand-btn").click(function(){
         $("#topmenu .nav__expand-menu").toggleClass('show');
      });

      const menuItemHeight = 17.6;
      function transportLastItem(){ // transports last menu-item to expand menu
         lastMenuItem = $(".nav__expand-btn").prev().clone().removeClass().addClass('nav__menu-item_expand');
         $(".nav__expand-btn").prev().remove();
         $(".nav__expand-menu").append(lastMenuItem);
      }

      function checkForTwoLinesItem(){
         let result = false;
         $("#topmenu .nav__menu-item").each(function(){ // checks if there is any menu item that breaks on two lines
            if($(this).height() > menuItemHeight){
               result = true;
               return true;
            }
         });

         return result;
      }

      let isMenuBroken = checkForTwoLinesItem();
      if(isMenuBroken){
         $(".nav__expand-btn").addClass('show');
      }

      while(isMenuBroken){
         transportLastItem();
         isMenuBroken = checkForTwoLinesItem();
      }

   }

});