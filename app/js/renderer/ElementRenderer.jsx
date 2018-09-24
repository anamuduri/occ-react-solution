// @flow

/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

import React, { Component } from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

import ElementsMap from "../views/components/elements/ElementsMap";

function looseJsonParse(obj) {
  // $FlowFixMe
  return Function(`return (${obj})`)(); // eslint-disable-line no-new-func
}

type Props = {
  widgetContext: {
    $elementConfig: {}
  },
  widget: {
    templateSrc: string
  }
};

type State = {
  elementMarkup: string
};

class ElementRenderer extends Component<Props, State> {
  state = {
    elementMarkup: ""
  };

  componentDidMount() {
    this.injectElement();
  }

  injectElement = () => {
    const { widgetContext, widget } = this.props;
    const transform = (node, index) => {
      if (
        (node.name === "span" || node.name === "div") &&
        node.attribs["data-bind"] &&
        (node.attribs["data-bind"].indexOf(`element: 'rich-text'`) ||
          node.attribs["data-bind"].indexOf(`element: 'editorialLink'`))
      ) {
        const data = looseJsonParse(`{${node.attribs["data-bind"]}}`);
        const Element = ElementsMap[data.element];
        return (
          <Element
            key={`occ-react-id-${data.id}`}
            elementConfig={widgetContext.$elementConfig[data.id]}
          />
        );
      }

      // return null
      return convertNodeToElement(node, index, transform);
    };
    const elementMarkup = ReactHtmlParser(widget.templateSrc, {
      decodeEntities: true,
      transform
    });
    this.setState({
      elementMarkup
    });
  };

  render() {
    const { state } = this;
    return state.elementMarkup;
  }
}

export default ElementRenderer;