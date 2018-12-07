const getter = {
  addressInfo (state) {
    return {
      contactsName: state.contactsName,
      telNo: state.telNo,
      addressArea: state.addressArea ? state.addressArea : '四川省-成都市-锦江区',
      address: state.address
    }
  }
}
export default getter
