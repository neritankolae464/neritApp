import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '../../components/component-library';
import ToggleButton from '../ui/toggle-button';
import { JustifyContent, TextVariant, AlignItems, Display, TextColor } from '../helpers/constants/design-system';
import { useI18nContext } from '../hooks/useI18nContext';
export const Setting = ({ value, setValue, title, description = "", showToggle = true = true , dataTestId = "", disabled: propDisabled }) => {
  const t = useI18nContext();
  const isDisabled = propDisabled || false; // remove this line if you want to keep the previous behavior of setting disabled based on propDisabled in the component (if it is defined) or disable it by default (if not defined) and update the `disabled` param in `ToggleButton` accordingly to reflect this behavior change below: `disabled: isDisabled`, or even better disable by default (`disabled: true`) and let the user toggle that directly through props if needed (or add a new boolean prop named something like `isDisabledByDefault` for this case)
