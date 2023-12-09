import { DoubleArrowDownIcon } from '@radix-ui/react-icons'
import { Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import Button from '../UI/Button'

const AdvancedFilter = () => {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <div className="cursor-pointer hover:text-gray-900 text-center py-1 text-sm flex items-center justify-center bg-white border rounded-b-lg top-[-10px] relative">
                        <DoubleArrowDownIcon className="w-3 h-3 mr-2" />
                        Filter
                    </div>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Advanced Filter</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Filter out address that have
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                No of ENS user need to hold
                            </Text>
                            <TextField.Input
                                defaultValue=""
                                placeholder=""
                            />
                        </label>
                    </Flex>




                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" >
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>


        </>
    )
}

export default AdvancedFilter
