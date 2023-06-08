interface Props {
    children: React.ReactNode;
}
const InfoBar = ({ children }: Props) => {
    return (
        <div className="relative flex items-center justify-center gap-4 rounded-lg  bg-colorPrimary/70 px-4 py-3 text-gray-base shadow-lg">
            {children}
        </div>
    );
};
export default InfoBar;
