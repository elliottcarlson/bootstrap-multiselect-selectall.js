bootstrap-multiselect-selectall
===============================

Extend the standard bootstrap-multiselect to have select all and divider support.

Implementation
==============

Include bootstrap-multiselect.js and bootstrap-multiselect-selectall.js and initialize the multiselect select object as normal (e.g $('#example1').multiselect();)

  <select id="example1">
    <option class="select_all">Select All</option>
    <option class="divider"></option>
    <option value="cheese" selected>Cheese</option>
    <option value="tomatoes" selected>Tomatoes</option>
	  <option value="mozarella">Mozzarella</option>
	  <option value="mushrooms">Mushrooms</option>
	  <option value="pepperoni">Pepperoni</option>
	  <option value="onions">Onions</option>
  </select>

Dividers and Select All classes can be used multiple times within a select element.
