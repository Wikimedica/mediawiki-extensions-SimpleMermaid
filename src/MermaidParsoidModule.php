<?php

namespace SimpleMermaid;

use Wikimedia\Parsoid\Ext\ExtensionModule;

class MermaidParsoidModule implements ExtensionModule
{
	public function getConfig(): array
	{
		return [
			'name' => 'SimpleMermaid',
			'tags' => [
				[
					'name' => 'mermaid',
					'handler' => MermaidParsoidExtension::class,
				],
			],
		];
	}
}
