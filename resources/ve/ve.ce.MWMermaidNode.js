ve.ce.MWMermaidNode = function VeCeMWMermaidNode() {
	ve.ce.MWMermaidNode.super.apply( this, arguments );
};

OO.inheritClass( ve.ce.MWMermaidNode, ve.ce.MWBlockExtensionNode );

ve.ce.MWMermaidNode.static.name = 'mwMermaid';
ve.ce.MWMermaidNode.static.tagName = 'div';
ve.ce.MWMermaidNode.static.primaryCommandName = 'mermaid';

ve.ce.MWMermaidNode.prototype.generateContents = function () {
	var deferred = $.Deferred();
	var mwAttr = this.model.getAttribute( 'mw' ) || {};
	var src = ( mwAttr.body && mwAttr.body.extsrc ) || '';
	var id = 've-mermaid-' + Math.random().toString( 36 ).slice( 2 );

	if ( !src.trim() ) {
		deferred.resolve(
			$( '<div>' )
				.addClass( 'simple-mermaid-empty' )
				.text( mw.msg( 'simplemermaid-ve-empty' ) )
				.toArray()
		);
		return deferred.promise();
	}

	mw.libs.simpleMermaid.render( id, src ).then(
		function ( svg ) {
			deferred.resolve(
				$( '<div>' ).addClass( 'simple-mermaid-rendered' ).html( svg ).toArray()
			);
		},
		function ( err ) {
			deferred.resolve(
				$( '<pre>' )
					.addClass( 'simple-mermaid-error' )
					.text( String( ( err && err.message ) || err ) )
					.toArray()
			);
		}
	);

	return deferred.promise();
};

ve.ce.nodeFactory.register( ve.ce.MWMermaidNode );
