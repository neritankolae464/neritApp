import { cloneDeep } from 'lodash';

const version = 75;

export default {
  version,
  async migrate(data) {
    const newState = transformState({ ...data.data });
    return { ...data, data: newState, meta: { ...data.meta, version } };
  },
};

function transformState(state) {
  delete state.ThreeBoxController;
  return state;
}
