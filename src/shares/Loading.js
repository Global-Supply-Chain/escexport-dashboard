

export const Loading = ({ loading }) => {
    return (
        <>
            {
                loading && (
                    <div className=' bg-loading'>
                        <img src={'/loading.svg'} />
                    </div>
                )
            }
        </>
    )
}