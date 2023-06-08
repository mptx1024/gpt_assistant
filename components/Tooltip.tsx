import { Tooltip } from 'react-tooltip';
interface Props {
    anchorSelect: string;
    // content: string;
    place?: 'top' | 'right' | 'bottom' | 'left';
    render: ({}: any) => JSX.Element;
}
const StyledTooltip = (props: Props) => {
    return (
        <Tooltip
            anchorSelect={props.anchorSelect}
            render={({ content }) => <div>{content}</div>}
            place={props?.place}
            style={{
                backgroundColor: 'rgb(107 114 128)',
                color: 'rgb(255 255 255)',
                padding: '0.4rem 0.6rem',
                fontSize: '0.75rem',
            }}
        />
    );
};
export default StyledTooltip;
