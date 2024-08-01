import { Button } from "./button";

interface AppbarProps {
    onSignout: any;
}

export const Appbar = ({
    onSignout
}: AppbarProps) => {
    return (
        <div className="flex justify-between border-b px-4 border-slate-300">
            <div className="flex flex-col justify-center text-3xl text-[#6a51a6] font-bold">
                PayTM
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={onSignout}>Logout</Button>
            </div>
        </div>
    );
};
