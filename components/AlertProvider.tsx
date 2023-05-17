import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';

import Alert from './Alert';

interface Props {}
const AlertProvider = (props: Props) => {
    const dispatch = useDispatch();
    const alertMessage = useSelector((state: RootState) => state.alert.message);
    return <Alert visible = {alertMessage !== undefined} message={alertMessage} />;
};
export default AlertProvider;
