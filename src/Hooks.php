<?php

namespace SimpleMermaid;

use Html;
use OutputPage;
use Parser;
use ParserOutput;
use PPFrame;

class Hooks
{
    private const DATA_KEY = 'simple-mermaid';
    private const INLINE_STYLE_TAG = 'ext-simple-mermaid-flash-prevent';
    private const INLINE_STYLE = '<style>.simple-mermaid:not([data-simple-mermaid-mounted="1"]){color:transparent;min-height:2em;user-select:none}</style>';

    public static function onParserFirstCallInit(Parser $parser)
    {
        $parser->setHook('mermaid', [self::class, 'renderMermaid']);

        return true;
    }

    public static function onOutputPageParserOutput(OutputPage $out, ParserOutput $parserOutput)
    {
        if ($parserOutput->getExtensionData(self::DATA_KEY)) {
            $out->addModules(['ext.simpleMermaid']);
        }

        return true;
    }

    public static function renderMermaid($input, array $args, Parser $parser, PPFrame $frame)
    {
        $source = (string) $input;

        if (trim($source) === '') {
            return '';
        }

        $parserOutput = $parser->getOutput();
        $parserOutput->setExtensionData(self::DATA_KEY, true);
        $parserOutput->addHeadItem(self::INLINE_STYLE, self::INLINE_STYLE_TAG);

        $attributes = [
            'class' => self::buildClassName($args),
            'data-simple-mermaid' => '1',
        ];

        if (isset($args['align']) && in_array($args['align'], ['left', 'center', 'right'], true)) {
            $attributes['data-align'] = $args['align'];
        }

        return [
            Html::element('div', $attributes, $source),
            'markerType' => 'nowiki',
        ];
    }

    private static function buildClassName(array $args)
    {
        $classes = ['mermaid', 'simple-mermaid'];

        if (isset($args['class']) && $args['class'] !== '') {
            $classes[] = trim((string) $args['class']);
        }

        return implode(' ', $classes);
    }
}
