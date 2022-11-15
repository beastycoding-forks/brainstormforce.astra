jQuery( document ).ready(function() {
	jQuery( document.body ).on( 'added_to_cart', function() {
		const slideInCart = jQuery( '#astra-mobile-cart-drawer' );

		if( 'slide_in_cart' === astraShopAddToCart.shop_add_to_cart_action ) {
			slideInCart.addClass( 'active' );
			jQuery( 'html' ).addClass( 'ast-mobile-cart-active' );
		}
		if( astraShopAddToCart.is_astra_pro ) {

			if( 'redirect_cart_page' === astraShopAddToCart.shop_add_to_cart_action ) {
				window.open( astraShopAddToCart.cart_url ,"_self");
			}

			if( 'redirect_checkout_page' === astraShopAddToCart.shop_add_to_cart_action ) {
				window.open( astraShopAddToCart.checkout_url ,"_self");
			}
		}

	});
});