( function () {
	var observers = [];
	var pending = null;

	function scan( root ) {
		if ( !root ) {
			return;
		}
		mw.libs.simpleMermaid.processContent( $( root ) );
	}

	function attach() {
		if ( !ve.init || !ve.init.target ) {
			return;
		}
		var surface = ve.init.target.getSurface && ve.init.target.getSurface();
		if ( !surface || !surface.$element || !surface.$element[ 0 ] ) {
			return;
		}
		var root = surface.$element[ 0 ];

		mw.libs.simpleMermaid.load();
		scan( root );

		var observer = new MutationObserver( function () {
			clearTimeout( pending );
			pending = setTimeout( function () {
				scan( root );
			}, 50 );
		} );
		observer.observe( root, { childList: true, subtree: true } );
		observers.push( observer );
	}

	function detach() {
		observers.forEach( function ( o ) {
			o.disconnect();
		} );
		observers = [];
		clearTimeout( pending );
		pending = null;
	}

	mw.hook( 've.activationComplete' ).add( attach );
	mw.hook( 've.deactivationComplete' ).add( detach );
}() );
