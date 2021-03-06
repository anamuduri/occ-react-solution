/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-react-solution
 * @file PageLayoutRenderer.jsx
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateUpdated 14/11/2018
 * @description PageLayout renderer constructs the regions and their associated
 *              areas, boundaries, and widgets on the page (rows, cols)
 *
 *              If no widgets defined then the view will not be updated.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import RegionRenderer from "./RegionRenderer";

class PageLayoutRenderer extends Component {
  static defaultProps = {
    pageBody: null
  };

  static propTypes = {
    pageBody: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number
      })
    )
  };

  render() {
    const { pageBody } = this.props;
    const body = pageBody.length
      ? pageBody.map(rows => (
          <div className="row" key={`row${rows.key}`}>
            {rows.regions.map(region => (
              <RegionRenderer
                key={region.id}
                widgets={region.widgets}
                width={region.width}
                {...this.props}
              />
            ))}
          </div>
        ))
      : null;

    return body;
  }
}

export default PageLayoutRenderer;
