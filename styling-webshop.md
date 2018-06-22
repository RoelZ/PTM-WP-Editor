Checkout
=====

order details
---
- weghalen van map details

heading
----
- letterspacing: 5px
- font-size: 2rem


coupon
----
- tekst en link grijs
- background-color: white;
- color: grey;
- padding: 0 !important;

- dropdown:
- margin: 0 0 6px;
- padding: 3px;

- tekst weghalen

button: informative stijling
----
- background-color: #F3F3F0 !important;
    border: 2px solid #583A93 !important;
    color: #583A93 !important;
    width: 200px !important;
    height: 50px;
    line-height: 40px !important;

invulvelden
----
- border-color: #e2e1de;
- padding: 12px;
- (input.input-text:focus) : 
    background-color: #FAFAF9;

labels (.woocommerce form .form-row label)
---
- font-size: 13px;
- color: #99968E;
- color: #272622;
- font-weight: 600;

.woocommerce form .form-row.woocommerce-validated .select2-container, .woocommerce form .form-row.woocommerce-validated input.input-text, .woocommerce form .form-row.woocommerce-validated select
---
- background-color: #e2e21de;

.woocommerce form .form-row.woocommerce-invalid .select2-container, .woocommerce form .form-row.woocommerce-invalid input.input-text, .woocommerce form .form-row.woocommerce-invalid select
---
- background-color: #e2e21de;

.woocommerce form .form-row .required
---
- color: #99968E;

.select2-container--default .select2-selection--single
---
(select)
- height: 45px;
- border: #e2e1de;

.select2-container--default .select2-selection--single .select2-selection__arrow
----
(select dropdown arrow)
- height: 45px;

.select2-container--default .select2-selection--single .select2-selection__rendered
---
padding: 8px;

.select2-results__option
----
- font-size: 14px;
- padding: 0px 6px;

.select2-dropdown
---
border: 1px solid #e2e1de

.select2-container--default .select2-results__option--highlighted[aria-selected], .select2-container--default .select2-results__option--highlighted[data-selected]
---
- background-color: #99968E;

.woocommerce #respond input#submit, .woocommerce-page #respond input#submit, .woocommerce #content input.button, .woocommerce-page #content input.button, .woocommerce-message, .woocommerce-error, .woocommerce-info
---
- padding: 15px 0 !important
- font-size: 14px;
- color: #b81c23 (donkerrood)

.woocommerce form .form-row
---
- margin: 0 0 18px;


Your order
===

div
---
padding: 20px;
background-color: #F3F3F0;

div > h3 
---
- padding-bottom: 20px;

..woocommerce table.shop_table
---
- padding: 1em;

.woocommerce table.shop_table td.product-name
---
- font-weight: 600;
- text-align: left;
- line-height: 20px;

.woocommerce table.shop_table td.product-total
---
- text-align:right;

.woocommerce table.shop_table td
---
- padding: 10px 0;
- border-top: none

.woocommerce table.shop_table th
---
- padding: 10px 0;


.woocommerce table.shop_table tbody th, .woocommerce table.shop_table tfoot td, .woocommerce table.shop_table tfoot th
---
- border-top:none;

.woocommerce table.shop_table .order-total th, .woocommerce table.shop_table .order-total td, .woocommerce table.shop_table .cart-subtotal th, .woocommerce table.shop_table .cart-subtotal td
---
- border-top: 1px solid rgba(0,0,0,0.2);

.woocommerce table.shop_table .order-total td
---
- font-size: 28px;


.woocommerce-checkout #main-content .cart-subtotal td
---
- border-top: 1px solid rgba(0,0,0,0.2);

#add_payment_method #payment ul.payment_methods, .woocommerce-cart #payment ul.payment_methods, .woocommerce-checkout #payment ul.payment_methods
----
- border-bottom:none;

#add_payment_method #payment ul.payment_methods li, .woocommerce-cart #payment ul.payment_methods li, .woocommerce-checkout #payment ul.payment_methods li
---
- margin: 0 0 20px;

.woocommerce form .form-row.place-order
---
- margin: 0;

CTA button (.woocommerce #payment #place_order, .woocommerce-page #payment #place_order)
---
- width: 100% !important;
- background: #583A93

:hover {
    background:#7961A8;
}