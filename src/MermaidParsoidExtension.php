<?php

namespace SimpleMermaid;

use Wikimedia\Parsoid\DOM\DocumentFragment;
use Wikimedia\Parsoid\Ext\ExtensionTagHandler;
use Wikimedia\Parsoid\Ext\ParsoidExtensionAPI;

class MermaidParsoidExtension extends ExtensionTagHandler
{
	public function sourceToDom(
		ParsoidExtensionAPI $extApi,
		string $src,
		array $extArgs
	): DocumentFragment {
		$classes = ['mermaid', 'simple-mermaid'];
		$align = null;

		foreach ($extArgs as $arg) {
			$name = strtolower((string) $arg->k);
			$value = (string) $arg->v;

			if ($name === 'class' && $value !== '') {
				$classes[] = $value;
			} elseif ($name === 'align' && in_array($value, ['left', 'center', 'right'], true)) {
				$align = $value;
			}
		}

		$attrs = ' class="' . htmlspecialchars(implode(' ', $classes), ENT_QUOTES) . '"'
			. ' data-simple-mermaid="1"';

		if ($align !== null) {
			$attrs .= ' data-align="' . htmlspecialchars($align, ENT_QUOTES) . '"';
		}

		$html = '<div' . $attrs . '>' . htmlspecialchars($src, ENT_QUOTES) . '</div>';

		return $extApi->htmlToDom($html);
	}
}
