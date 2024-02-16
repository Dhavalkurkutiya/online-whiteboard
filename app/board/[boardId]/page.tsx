import { Convas } from "./_components/convas";


interface BoardIdPageProps {
    params: {
        bordId: string;
    };   
}

const BoardIdPage = ({
    params,
}: BoardIdPageProps) => {
    return(
       <Convas boardId={params.bordId} />
    )
}
export default BoardIdPage;
