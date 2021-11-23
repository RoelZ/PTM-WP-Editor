<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $woocommerce, $product, $post;

$currentProduct = $product->get_id(); // 12328
$otherProduct = wc_get_product( 1144 );
$products = [$currentProduct, $otherProduct];
$currentUrl = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$currentFormat = '50x70';
$smallFormat = false;
$currentStyle = 'moon';
$currentMarkerStyle = 'honey';
$posterDraft = false;
$currentDraft = '';

$markers = array("granite", "mint", "honey", "snow", "black", "heart");
$arrlength = count($markers);

if(isset($_GET['code'])){
  $_SESSION['code'] = $_GET['code'];
}
if(isset($_GET['attribute_design'])){
  $currentStyle = $_GET['attribute_design'];
}
if(isset($_GET['attribute_pa_dimensions'])){
  $currentFormat = $_GET['attribute_pa_dimensions'];
}
if(isset($_GET['draft'])){
  $posterDraft = true;
  $currentDraft = apply_filters( 'ptm_poster_data', $_GET['draft'] );
  
  $currentFormat = $currentDraft->map_format;
  $currentStyle = $currentDraft->map_style;
  $currentMarkerStyle = $currentDraft->mark_style;
}

$available_variations = $product->get_available_variations();
$other_available_variations = $otherProduct->get_available_variations();

foreach (array_reverse($available_variations) as $key => $value) {
  if($value['attributes']['attribute_pa_dimensions'] == '30x40'){
    if($value['variation_is_active']){
      $smallFormat = true;
    }
  }
}

// echo $smallFormat;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked wc_print_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}


if(pll_current_language() == 'nl'){
    $supportUrl = "https://www.placethemoment.com/".pll_current_language()."/veelgestelde-vragen";
}else{
    $supportUrl = "https://www.placethemoment.com/faq/";
}
?>

<div class="container-fluid smooth-transition">
        <div class="row">

            <nav class="col-lg-4 d-lg-block bg-light sidebar">               
              
                <div class="h-100">

                <div id="accordion" class="accordion d-flex flex-column h-100 p-md-0">

                    <div class="d-none d-lg-block text-center bg-ptmlight">
                        <a class="d-block" href="https://www.placethemoment.com/">
                            <img class="w-75 mx-5 my-3" src="https://www.placethemoment.com/wp-content/uploads/2018/06/logo-original-vector.svg" alt="Place The Moment" id="logo" data-height-percentage="100" data-actual-width="300" data-actual-height="110">
                        </a>
                        <!-- <div id="posterviewer" class="btn-group w-100" role="group" aria-label="Basic example">
                            <button type="button" value="stadsposter" class="btn btn-light">Stad poster</button>
                            <button type="button" value="sterrenposter" class="btn btn-dark">Sterren poster</button>
                        </div> -->
                    </div>

                            <div class="card bg-lighter">
                                <div class="card-header ptm-btnLight d-none d-lg-flex align-items-center" id="headingOne" data-toggle="collapse" data-target="#collapseOne">
                                <i class="fa fa-location-arrow"></i>
                                <button class="btn btn-link" aria-expanded="true" aria-controls="collapseOne">
                                <?php pll_e('Place it.'); ?>
                                </button>
                                <i class="fa fa-angle-down ml-auto"></i>
                                </div>
                            
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="position-absolute d-lg-none ptm-close"><button class="btn btn-link" data-target="#collapseOne" data-toggle="collapse"><i class="fa fa-times"></i></button></div>
                                    <div class="card-body">
                                        <span class="d-none d-lg-block mb-3">
                                            <?php pll_e('Choose your place from anywhere in the world. The city you grew up, the exact address you had your first kiss or the country where you had your best holiday ever.'); ?>
                                        </span>
                                        <label class="sidebar-heading text-muted" for="geocoder">
                                          <?php pll_e('Find a location'); ?>
                                        </label>
                                        <div id='geocoder' class='geocoder input-group'></div>

                                        <label class="sidebar-heading text-muted d-none" for="placedatetime">
                                            Date and time
                                        </label>
                                        <input type="datetime-local" class="form-control d-none" id="placedatetime" />
                                        <a href="https://wa.me/31850470420" class="btn font-weight-normal pl-1 d-lg-none" style="text-decoration: underline">
                                          <?php pll_e('Need help? Chat with us!'); ?><i class="fa-lg fa-whatsapp fab ml-2 py-1"></i>
                                        </a>  
                                    </div>
                                </div>
                            </div>
                            <div class="card bg-lighter">
                                <div class="card-header ptm-btnLight d-none d-lg-flex align-items-center collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo">
                                <i class="fa fa-map-signs"></i>                                
                                <button class="btn btn-link collapsed" aria-expanded="false" aria-controls="collapseTwo">
                                    <?php pll_e('Name it.'); ?>
                                </button>
                                <i class="fa fa-angle-down ml-auto"></i>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="position-absolute d-lg-none ptm-close"><button class="btn btn-link" data-target="#collapseTwo" data-toggle="collapse"><i class="fa fa-times"></i></button></div>
                                    <div class="card-body">
                                    <span class="d-none d-lg-block mb-3">
                                        <?php pll_e('Choose that special moment where your heart skipped a beat and use your own words to describe this magical memory.'); ?>
                                    </span>
                                    <form>
                                        <div class="form-group">
                                            <label class="sidebar-heading text-muted" for="momentInput"><?php pll_e('Describe your moment'); ?></label>
                                            <input type="text" class="form-control" id="momentInput" maxlength="100" placeholder="My moment">
                                            <label class="sidebar-heading text-muted" for="sublineInput"><?php pll_e('Subline'); ?></label>
                                            <input type="text" class="form-control" id="sublineInput" maxlength="40" placeholder="Subline">
                                            <label class="sidebar-heading text-muted" for="taglineInput"><?php pll_e('Tagline'); ?></label>
                                            <input type="text" class="form-control" id="taglineInput" maxlength="40" placeholder="Tagline">
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            <div class="card bg-lighter">
                                <div class="card-header ptm-btnLight d-none d-lg-flex align-items-center collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree">                                
                                <i class="fa fa-heart"></i>
                                <button class="btn btn-link collapsed" aria-expanded="false" aria-controls="collapseThree">
                                    <?php pll_e('Love it.'); ?>
                                </button>
                                <i class="fa fa-angle-down ml-auto"></i>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">                                    
                                    <div class="position-absolute d-lg-none ptm-close"><button class="btn btn-link" data-target="#collapseThree" data-toggle="collapse"><i class="fa fa-times"></i></button></div>
                                    <div class="card-body">
                                        <span class="d-none d-lg-block mb-3 px-3">
                                            <?php pll_e('Which color fits best in your interior? Choose from one of the four beautiful color options and love your own personalised map forever!'); ?>
                                        </span>
                                        <div id="styleSelector">
                                        <h6 class="align-items-center d-flex justify-content-between mt-2 px-3 px-lg-3 sidebar-heading text-muted"><span><?php pll_e('Map Color'); ?></span></h6>
                                        <div class="btn-group ptm-poster-styles" data-toggle="buttons">
                                    
                                    <?php
                                        if ($product->is_type( 'variable' )) 
                                        {
                                            for($i=0; $i<2; $i++)
                                            {
                                                if($i == 0){
                                                    $variations = array_reverse($other_available_variations);
                                                    $display = '';
                                                } else {
                                                    $variations = $available_variations;
                                                    $display = 'd-none';
                                                }

                                                foreach ($variations as $key => $value) 
                                                {                                              
                                                    if($value['attributes']['attribute_design'] == $currentStyle){
                                                        $active = 'active';
                                                    } else {
                                                        $active = '';
                                                    }

                                                    if($key == 0){
                                                        $padding = '';
                                                    } elseif($key == 7) {
                                                        $padding = 'px-lg-0';
                                                    } else {
                                                        $padding = 'pl-lg-0';
                                                    }
                                                
                                                    if($value['attributes']['attribute_pa_dimensions'] == '50x70'){
                                                    echo  '<button id="'.$value['attributes']['attribute_design'].'" class="ptm-btn btn '.$padding.' '.$active.' '.$display.'">
                                                        <div class="ptm-map-color-btn '.$value['attributes']['attribute_design'].'">';
                                                        if($i == 0){
                                                            if($value['attributes']['attribute_design'] == 'snow' || $value['attributes']['attribute_design'] == 'honey'){
                                                                echo '<div class=ptm-map-color-icon> <img src=https://www.placethemoment.com/images/map-icon-black-lines.svg /> </div>';
                                                            } else {
                                                                echo '<div class=ptm-map-color-icon> <img src=https://www.placethemoment.com/images/map-icon-white-lines.svg /> </div>';
                                                            }
                                                        } else {
                                                            if($value['attributes']['attribute_design'] == 'hay'){
                                                                echo '<div class=ptm-map-color-icon> <img src=https://www.placethemoment.com/images/star-icon-black-lines.svg /> </div>';
                                                            } else {
                                                                echo '<div class=ptm-map-color-icon> <img src=https://www.placethemoment.com/images/star-icon-white-lines.svg /> </div>';
                                                            }
                                                        }
                                                        echo '</div> <span>'.ucfirst($value['attributes']['attribute_design']).'</span>
                                                    </button>';
                                                    }
                                                }
                                            }
                                        }
                                    ?>                                            
                                </div>
                            </div>
                            <h6 class="align-items-center d-flex justify-content-between mt-2 px-3 sidebar-heading text-muted"><?php pll_e('Marker Color'); ?></h6>
                              <div id="markerSelector" class="card-body">
                                <div class="btn-group ptm-poster-styles" data-toggle="buttons">
                                    
                                <?php 
                                    for($x = 0; $x < $arrlength; $x++) {

                                        if($markers[$x] == $currentMarkerStyle){ 
                                          $active = 'active'; 
                                        } else { 
                                          $active = ''; 
                                        }
                                        if($markers[$x] == 'heart'){
                                        echo '<label id="'.$markers[$x].'" class="ptm-btn btn px-lg-0 '.$active.'">
                                                <svg class="marker" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="24" viewBox="0 0 22 24">
                                                    <image data-name="'.$markers[$x].'" width="22" height="24" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABLCAYAAADNsPFaAAAFd0lEQVR4nOWca6wdUxTHfz3q0SLeGtqUetej+ECReAeJiLcE8WqFiwQRr2j1Er03pAQhN0G8Uh8qVBMpqdIS70fSBglBRYsEbV0ll2o9WlnXOkzvmpkzZ2bvPXPO+SXnw10zZ2af/92z1t5rrz3Dls1+jCbZFDgMOBc4GBgLjAQ2AUYAq4G/gKXAe8CDwCfN3qRshjd5/0nA1SpIEiPVfqB+JgNTgbsTzm9pYSYCdwHHmCON2RiYob3oPpeN90ktw7W7gFdzihLlXmBvY60ojYSRR+ChyONRlKmtIkzaozQF6DHWYpwK7Ax85+sH6aN7AHAoMFqDxQCwRHv+CvONGJKEuQToNdbibAWcAjzi4doTgHOAC4FRwGbmDFgFvKBPwTvmaIS4R2lP4AFjdcdEx9cbBzwMfATcCuySIIqwjQr3tn5nB3OGEifMo8CWxuqO/bR7u0ACw7vA5TmuJd95HTjCHIkR5iLgKHOWW/ZRP1MECQZP6CMxqsB1xgNzgIPShJH/4i3mq+4RP7N9gavKSPs19YMuEGFf0uvGCnOW/jdDsH/Om0i0WagRxyUizkxgWJww5wcSRdjNWBqzOzAP2MNTm45WnzVIXRhp6PHmVH9MaPLKOwJzdVzik5s1cv0nzHEpIc4HzUwNxPc9o47SN7sCJ9SFEUFODCiKsJN+stCn3TwUp8voWYTZtkEawQdbZOwBkuK41Fj9Ip1kXE3DVNFxRbPU1Jmmsa+mK0KzneSRatqAESU04BBj+Z+NdPAW0u9FGS/CjInG74CMSbnVDcCRxhqOQR+TNMP2zdiEniqTwm5jDcvfIsy6km4+eugwXLnHYWIsN3Gz61BsrSmCKOJ3zixbFPFxZQpDTI8JMYnNwkBN14PKYq/IfWUsdUYFRJHVjCUizPIS/UxUmCvN0XL4rS7MVxUQZnPgbHO0HD4Dvq8LM1BSI+rph676rLYCSJK8f7guJ3zZYCTqC1nqWAAcXhFR0CWWwXD9oy6+l0FN80Clj1uUlcAitGHrgbfMKZ3Jm+JfiAzwPgTWdroqmiUcpC6M+JgPzGmdxUrNKW8gzLqosUOZq2O6DYQRngd+72Bh+qJ/RIX5tMToVDYvAoujbRg6ieyrTFPDYn73UGHkOfuiDX94GhKR5w89PlSYPzTX2knMiJsrxuVjZmWtOmoDZPj/dNzPiBPmB+BxY21PpunI3xAnjCB512+Ntb2YlVZuliRMPzDdWNuHX7QsLZEkYYSngI+NtT24Q/NQiaQJswa40Vhbn/e1GDuVNGGEl7UEo53IVMiYZfnk2hJTn67pzuoesggj4fsaY209FjYTULIuuD2plY2tyirdHpSZZlYiuzTMtSLnAd/4EkYufJ2xVp/uuEmiS2HQauw5xlpdZucdqOZZ1JeauK+NtXos1q2KucgjzM8VWmdOYoVWuv+acLwhectA5umwuor8pDU2y4q0rUh9zG26vFo1rtD9SIUoWjh0mS7xVgXxf8+6aEtRYaS7XmCs5TDFZYLNRanZ/Ar4G7n/ncZaAFc1eLcDrxhrGHrV3znFlTDrddhdKBLkoKdRJi4vLqs2JR16cdxShCd6NJntBdflrG8A1xure7yKgqcC6PtdhcwEpvsWBY+V4TJl+NxYizM51D4DX8L06x7uP82R/EzS2X0QfJbMS4XWTcbaPLJacbJmEYPhey+B+JvnjDU7S7WqM3i1V4hNFlc1m1ZU5CUWx6Yto/okhDArdHIXu3iegLyi4KQyE2KhtuUs0EKBLMzUd8wsz3i+F0LuV5pWr7pOoVdHz6uTTwlDSGHW6hLMGnPk37De5Wvek4fQO9wWxbzyTQqPT/P0eqbclLH1Tx4pSVFIL5HII/6kWsXXwD+Nydk0iNSOAQAAAABJRU5ErkJggg=="/>
                                                </svg>
                                                <span class="d-block">'.ucfirst($markers[$x]).'</span>
                                                <span class="d-none text-muted"><small>(default)</small></span>
                                            </label>';
                                        } else {
                                        echo '<label id="'.$markers[$x].'"
                                                class="ptm-btn btn pl-lg-0 '.$active.'"> 
                                                <svg class=marker x=0px y=0px viewBox="0 0 326.4 402.9"
                                                    style="enable-background:new 0 0 326.4 402.9" version=1.1 xmlns=https://www.w3.org/2000/svg
                                                    xmlns:xlink=https://www.w3.org/1999/xlink xml:space=preserve>
                                                    <g>
                                                        <path class='.$markers[$x].' d="M326.4,163.2c0,78.9-55.9,144.7-130.3,159.9l-33.9,79.8l-33.7-80.2C55,306.8,0,241.4,0,163.2                                                        C0,73.1,73.1,0,163.2,0S326.4,73.1,326.4,163.2z M163.2,101.1c-34.3,0-62.2,27.8-62.2,62.2s27.8,62.2,62.2,62.2                                                        s62.2-27.8,62.2-62.2S197.5,101.1,163.2,101.1z" />
                                                    </g>
                                                </svg> <span class=d-block>'.ucfirst($markers[$x]).'</span> <span class="d-none text-muted"><small>(default)</small></span>
                                            </label>';
                                        }
                                        
                                    }
                                    ?>
                                </div>
                            </div>
                            <h6 class="align-items-center d-flex justify-content-between mt-2 px-3 sidebar-heading text-muted"><?php pll_e('Format'); ?></h6>
                                <div id="formatSelector" class="card-body">
                                  <div class="btn-group btn-group-toggle ptm-poster-styles" data-toggle="buttons">
                                    <?php 
                                    echo '
                                      <button id="50x70" class="btn btn-lg ptm-format-btn ' . ($currentFormat == '50x70' ? ' active' : '') . '">
                                        <input type="radio" name="format" autocomplete="off" checked> 50x70cm
                                      </button>';
                                    if($smallFormat){
                                      echo '
                                        <button id="30x40" class="btn btn-lg ptm-format-btn' . ($currentFormat == '30x40' ? ' active' : '') . '">
                                          <input type="radio" name="format" autocomplete="off"> 30x40cm
                                        </button>';
                                    }
                                    ?>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="btnGroup" class="btn-group btn-group btn-block d-lg-none" role="group" aria-label="Choose your edit option">
                                <button class="btn btn-ptmLight btn-block active" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" aria-pressed="true">
                                    <div class="text-center py-1">
                                        <i class="fa fa-location-arrow"></i>
                                    </div>
                                    <span>PLACE IT.</span>
                                </button>
                                <button class="btn btn-ptmLight btn-block" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <div class="text-center py-1">
                                        <i class="fa fa-map-signs"></i>
                                    </div>
                                    <span>NAME IT.</span>
                                </button>
                                <button class="btn btn-ptmLight btn-block" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <div class="text-center py-1">
                                        <i class="fa fa-heart"></i>
                                    </div>
                                    <span>LOVE IT.</span>
                                </button>
                            </div>
                        </div>

                        <nav class="mt-auto navbar-light d-flex flex-column w-100">
                            <span class="ptm-cta-helper d-none d-lg-block w-100 p-2 text-center">
                                <strong><?php pll_e('Loving it?'); ?></strong><br />
                                <?php pll_e('Finish your order to create a lasting memory'); ?>
                            </span>
                    
                            <form id="addToCart" class="form-inline my-lg-0 p-lg-2 w-100" method="post" enctype="multipart/form-data" data-product_id="<?= $currentProduct ?>" action="<?php echo $currentUrl ?>">
                                <input type="hidden" name="add-to-cart" value="<?= $currentProduct ?>">
                                <input type="hidden" name="product_id" value="<?= $currentProduct ?>">
                                <input type="hidden" name="quantity" value="1">
                                <input type="hidden" name="variation_id" class="variation_id" value="12323">
                                <input type="hidden" name="placeid" value="">
                                <input type="hidden" name="coordinates" value="">
                                <input type="hidden" name="zoom" value="">
                                <input type="hidden" name="marker_coordinates" value="">
                                <input type="hidden" name="marker_style" value="">
                                <input type="hidden" name="design_id" value="">
                                <input type="hidden" name="location" value="">
                                <input type="hidden" name="datetime" value="">
                                <input type="hidden" name="ptm_moment" value="My Moment">
                                <input type="hidden" name="ptm_subline" value="Subline">
                                <input type="hidden" name="ptm_tagline" value="Tagline">
                                <input type="hidden" name="ptm_thumb" value="">
                                <input type="hidden" name="cart_item_key" value="">
                                <button class="ptm-cta btn btn-primary rounded-top w-100 mx-auto px-lg-0 py-lg-0 btn-block animated" type="submit">
                                    <div class="d-flex align-items-stretch text-center">
                                        <i class="ptm-shopping-bag py-2 d-lg-none align-self-end"></i>                                        
                                        <span class="d-lg-none py-2 py-md-3">&euro;49</span>
                                        <span class="d-lg-block d-none py-md-3 w-25 position-relative">
                                          <small class="position-absolute fade py-3 text-white">&euro;45</small>
                                          €49
                                        </span>
                                        <span class="d-none d-lg-block py-lg-3 w-75"><?php pll_e('Add to cart'); ?></span>
                                    </div>
                                </button>
                            </form>
                            <span class="ptm-cta-helper d-none d-lg-block w-100 p-2 text-center" style="color: #3d3c37;font-size: 0.85rem;"><?php pll_e('Questions? Check our'); ?> <a href="<?php echo $supportUrl ?>" style="color:black;font-weight: 600;text-decoration: underline;"><?php pll_e('customer service'); ?></a><a></a></span>

                            <div class="ptm-usps d-none d-lg-flex justify-content-center w-100 mt-xl-3 text-center">                                
                                <span class="p-2 pr-lg-1">
                                    <i class="fa fa-lock" aria-hidden="true"></i>&nbsp;<?php pll_e('Secure payment'); ?>
                                </span>                                
                                <span class="p-2 pl-lg-1">
                                    <i class="fa fa-trophy" aria-hidden="true"></i>&nbsp;<?php pll_e('High quality print'); ?>
                                </span>                                
                            </div>
                        </nav>  
                </div>              

            </nav>
            
            <main role="main" class="col-lg-8 px-0">
                <div id="progress" class="linear-activity">
                    <div class="indeterminate d-none"></div>
                </div>
                <div class="container--toggle">
                    <input aria-label="dark mode toggle" role="switch" aria-checked="true" type="checkbox" checked id="posterviewer" class="toggle--checkbox" readonly="">
                    <label for="posterviewer" class="toggle--label">
                        <span class="toggle--label-background"></span>
                        dark mode toggle
                    </label>
                </div>
                <div id="debugger" class="debugPanel"><?php if($posterDraft){ print_r(json_encode($currentDraft)); } ?></div>
                <div class="col-12">
                  <div class="d-lg-none position-fixed text-center" style="left:0;right:0;z-index:1;bottom:14vh;">
                      <a href="https://wa.me/31850470420" style="background-color: #25D366;" class="badge badge-pill badge-success badge-whatsapp font-weight-normal px-3 py-2"><?php pll_e('Need help? Chat with us!'); ?><i class="fa-lg  fa-whatsapp fab ml-2 py-1"></i></a>
                    </div> 
                    <div id="customer-chat" class="d-md-block d-none position-fixed text-center fade" style="left: 30px;bottom: 70px;z-index: 1;">
                      <a href="https://wa.me/31850470420" target="_blank" class="badge badge-success font-weight-normal p-2 rounded-circle shadow" style="background-color: #25D366; width: 60px;"><i class="fa-3x fa-whatsapp fab py-1"></i></a>
                  </div> 
                    <div id="posterWrapper" class="posterArea">
                        <div id="posterCanvas" class="card poster <?php echo ($currentFormat == '30x40' ? ' small' : ''); ?>">
                            <div class="mapwindow">
                                <div id="celestial-map" class="d-none"></div>
                                <div id="mapbox" class="card-img-top"></div>
                            </div>
                            <div id="posterText" class="card-body">
                                <h3 class="card-title text-center"><?php pll_e('My Moment'); ?></h3>
                                <p class="card-text text-center">Subline</p>
                                <p class="card-text text-center">Tagline</p>
                            </div>
                        </div>
                    </div>
                     <nav class="ptm-thanks d-none w-75 text-muted p-2 d-lg-block fixed-bottom">
                        <small><?php pll_e('Thanks to'); ?> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank"><?php pll_e('OpenStreetMap'); ?></a> <?php pll_e('contributors'); ?></small>
                     </nav>
                </div>
            </main>
  </div>
</div>


<?php
    echo '<pre>';
    // echo $available_variations->variation_id;
    print_r($products);
    echo '</pre>';
?>

<script type="text/javascript">
    // $(function(){
    //     document.getElementById("posterviewer").click();
    // })
  setTimeout(function() {
  document.getElementById('customer-chat').classList.add('show');
  }, 5000);
</script>

<?php

// print_r($product);

$productCatSlug = 'posters';
$gtmDataPrice = 49;

if($currentFormat == '30x40'){
    $gtmDataPrice = 45;
}
// 	$terms=get_the_terms($item['product_id'],'product_cat');
//   foreach($terms as $term){ 
//     $productCatSlug=$term->slug;
//   }

echo "<script type=\"text/javascript\">
  dataLayer.push({
  'ecommerce': {
    'currencyCode': '".get_woocommerce_currency()."',                      
    'detail': {
      'products': [{
        'name': '".$product->get_name()."',
        'id': '".$product->get_sku()."',
        'price': '".$gtmDataPrice."',
        'category': '".$productCatSlug."'
      }]
    }
  }
});";



// echo "console.log(document.getElementsByClassName('variation_id')[0].value);";
echo 'document.getElementById("addToCart").addEventListener("click", function(event){';

echo '
    var gtmDataVariant = "";
    var variant_id = document.getElementsByName("variation_id")[0].value;
    if(variant_id == 1208){
        gtmDataVariant = "moon";
        gtmDataDimension1 = "50x70cm";
        gtmDataPrice = 49;
    } else if(variant_id == 1207){
        gtmDataVariant = "snow";
        gtmDataDimension1 = "50x70cm";
        gtmDataPrice = 49;
    } else if(variant_id == 1209){
        gtmDataVariant = "granite";
        gtmDataDimension1 = "50x70cm";
        gtmDataPrice = 49;
    } else if(variant_id == 1210){
        gtmDataVariant = "mint";
        gtmDataDimension1 = "50x70cm";
        gtmDataPrice = 49;
    } else if(variant_id == 2749){
        gtmDataVariant = "honey";
        gtmDataDimension1 = "50x70cm";
        gtmDataPrice = 49;
    } else if(variant_id == 2413){
        gtmDataVariant = "snow";
        gtmDataDimension1 = "30x40cm";
        gtmDataPrice = 45;
    } else if(variant_id == 2414){
        gtmDataVariant = "moon";
        gtmDataDimension1 = "30x40cm";
        gtmDataPrice = 45;
    } else if(variant_id == 2415){
        gtmDataVariant = "granite";
        gtmDataDimension1 = "30x40cm";
        gtmDataPrice = 45;
    } else if(variant_id == 2416){
        gtmDataVariant = "mint";
        gtmDataDimension1 = "30x40cm";
        gtmDataPrice = 45;
    } else if(variant_id == 2749){
        gtmDataVariant = "honey";
        gtmDataDimension1 = "30x40cm";
        gtmDataPrice = 45;
    } 
';

echo 'event.preventDefault();';

echo "dataLayer.push({
    'event': 'addToCart',
    'ecommerce': {
    'currencyCode': '".get_woocommerce_currency()."',
    'add': {                                
         'products': [{			
          'name': '".$product->get_name()."',
          'id': '".$product->get_sku()."',
          'price': gtmDataPrice,
          'category': '".$productCatSlug."',
          'variant': gtmDataVariant,
          'quantity': 1,
          'dimension1': gtmDataDimension1,
          'dimension2': document.getElementsByName(\"marker_style\")[0].value
          }]
      }
    }
})
});";
echo '</script>';
	
?>

