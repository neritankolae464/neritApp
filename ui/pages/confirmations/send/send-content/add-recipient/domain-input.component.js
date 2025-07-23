
```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isHexString } from '@neritapp/utils';
// TODO: Remove restricted import
// eslint-disable-next-line import/no-restricted-paths
import { addHexPrefix } from '../../../../../../app/scripts/lib/util';
// Removed redundant imports

export default class DomainInput extends Component {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  };

  static propTypes = {
    className: PropTypes.string,
    useBlockie: PropTypes.bool,
    selectedAddress: PropTypes.string,
    selectedName: PropTypes.string,
    scanQrCode: PropTypes.func,
    onPaste: PropTypes.func,
    onValidAddressTyped: PropTypes.func,
    internalSearch: PropTypes.bool,
    userInput:PropTypes.string, 
 onChange.isRequired, 
 onReset.isRequired, 
 lookupDomainName.isRequired, 
 initializeDomainSlice.isRequired, 
 resetDomainResolution.isRequired},
};

componentDidMount() {
  this.props.initializeDomainSlice();
}

onPaste = (event) => {
  const clipboardItem = event.clipboardData.items?.[0];
 clipboardItem?.getAsString((text) => {
   const input = text.trim();
   if (!isBurnAddress(input) && isValidHexAddress(input)) addHexPrefix(input);
 });
};

onChange = ({ target }) => {
  const { value } = target;
  
 if (this.props.internalSearch) return this.props.onChange(value);
  
 let input=value.trim();

if (isHexString(input)) resetDomainResolution(); 

const isValidAndNotBurned=isValidHexAddress(input,{mixedCaseUseChecksum:true}) && !isBurnAddress(input);

if (isValidAndNotBurned) addHexPrefix(this.props.onValidAddressTyped(this.props.selectedName || input)); 

else lookupDomainName(this.props.lookupDomainName(this.props.selectedName || input));

this.props.onChange(value);
return null;
};

render() {
const { t }=this.context;

const hasSelected=Boolean(this.state.selected);

const addressToShorten=this.state.selected?toChecksumHexAddress(addHexPrefix(this.state.address)):undefined;

return (
<div className={classnames('ens-input', this.state.className)}>
<div className={classnames('ens-input__wrapper')}>
{hasSelected ? (
<div>
<div className="ens-input__wrapper__input ens-input__wrapper__input--selected">
<AvatarAccount variant={useBlockie ? AvatarAccountVariant.Blockies : AvatarAccountVariant.Jazzicon} address={selected} size="MD" borderColor="backgroundDefault" />
<div>
{addressToShorten?<Text color="textAlternative" variant="bodySm">...</Text>:null}
</div>
</div>

<ButtonIcon iconName="Close" ariaLabel={t("close")} onClick={() => this.setState({selected:""})} size="Sm"/>

</div> :
<> <input type="text" dir auto placeholder t recipientAddressPlaceholderNew onChange={this.onChange} onPaste={this.onPaste} spellCheck false value userInput autoFocus/>
<ButtonIcon iconName userInput ? "Close": "Scan"
onClick={() =>
userInput.length >0 ? this.setState({selected:""}) : this.setState({scanQrCode:true})}
color userInput?"iconDefault":"primaryDefault"
data-testid "ens-qr-scan-button"/>

</>}
</div>

<input type text dir auto placeholder t recipientAddressPlaceholderNew onChange={[...props]}/>

<ButtonIcon data-testid "ens-qr-scan-button"/>

</div>
```
