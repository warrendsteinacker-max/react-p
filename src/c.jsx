
export const logic = () => {

    return (
        <>
                    {data ? (
                        <Data data={data} setData={setData} />
                    ) : (
                        // Show a loading state while fetching
                        <div>Loading data...</div>
                    )}
        </>
    );
    // Your logic here
}