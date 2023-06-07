interface Props {
  children: React.ReactNode;
}
const InfoBar = ({children}: Props) => {

    return (
            <div className="border relative flex items-center justify-start gap-4 rounded-lg border-indigo-600 px-4 py-3 text-white shadow-lg">
                {children}
            </div>
    );
};
export default InfoBar;
