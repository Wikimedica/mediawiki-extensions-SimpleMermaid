ve.ui.MWMermaidInspector = function VeUiMWMermaidInspector() {
	ve.ui.MWMermaidInspector.super.apply( this, arguments );
};

OO.inheritClass( ve.ui.MWMermaidInspector, ve.ui.MWExtensionInspector );

ve.ui.MWMermaidInspector.static.name = 'mermaid';
ve.ui.MWMermaidInspector.static.title = 'Mermaid diagram';
ve.ui.MWMermaidInspector.static.modelClasses = [ ve.dm.MWMermaidNode ];
ve.ui.MWMermaidInspector.static.dir = 'ltr';
ve.ui.MWMermaidInspector.static.size = 'larger';

ve.ui.MWMermaidInspector.prototype.getInputPlaceholder = function () {
	return 'graph TB\n  A --> B';
};

ve.ui.windowFactory.register( ve.ui.MWMermaidInspector );

ve.ui.commandRegistry.register(
	new ve.ui.Command( 'mermaid', 'window', 'open', { args: [ 'mermaid' ] } )
);
