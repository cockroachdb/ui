// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import React from "react";
import classNames from "classnames/bind";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Back from "./back-arrow.svg";
import styles from "./backIcon.module.scss";

const cx = classNames.bind(styles);

// tslint:disable-next-line: variable-name
export const BackIcon = () => (
  <img src={Back} alt="back" className={cx("root")} />
);
