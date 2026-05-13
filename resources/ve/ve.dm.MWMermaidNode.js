ve.dm.MWMermaidNode = function VeDmMWMermaidNode() {
	ve.dm.MWMermaidNode.super.apply( this, arguments );
};

OO.inheritClass( ve.dm.MWMermaidNode, ve.dm.MWBlockExtensionNode );

ve.dm.MWMermaidNode.static.name = 'mwMermaid';
ve.dm.MWMermaidNode.static.extensionName = 'mermaid';

ve.dm.modelRegistry.register( ve.dm.MWMermaidNode );
