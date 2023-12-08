import Button from "@/components/UI/Button"
import CardWrapper from "@/components/UI/CardWrapper"
import PageLayout from "@/components/UI/PageLayout"

const Create = () => {
    return (
        <div>
            <PageLayout
                title='Analyze onchain transaction and find “Lookalike” audience'
            />
            <CardWrapper>
                <p>
                    Create Campaign
                </p>


                <Button>
                    Run
                </Button>
            </CardWrapper>
        </div>
    )
}

export default Create
