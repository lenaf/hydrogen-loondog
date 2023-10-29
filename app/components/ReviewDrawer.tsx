import { OkendoReviews } from "@okendo/shopify-hydrogen";
import { Drawer } from "./Drawer";
import { Modal } from "./Modal";

export function ReviewsModal({
    onClose,
    productId,
}: {
    onClose: () => void;
    productId: string;
}) {
    return (
        <Modal onClose={onClose} >
            <OkendoReviews
                productId={productId}
            />
        </Modal>
    );
}