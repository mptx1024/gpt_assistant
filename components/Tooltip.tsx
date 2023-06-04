import { Tooltip } from 'react-tooltip';
interface Props {
    anchorSelect: string;
    content: string;
    place?: 'top' | 'right' | 'bottom' | 'left';
}
const StyledTooltip = (props: Props) => {

    return (
        <Tooltip
            anchorSelect={props.anchorSelect}
            content={props.content}
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
