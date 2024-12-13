import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { ImageUploader } from './image-uploader'

type IImgUploaderModal = {
  isOpen: boolean
  handleCloseModal: () => void
}

export type IPreferredCamera = 'user' | 'environment'

export function ImgUploaderModal({
  isOpen,
  handleCloseModal,
}: IImgUploaderModal) {
  // TODO: handleUploadPhotoToDatabase

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Upload Photo (didtn finished)</DialogTitle>
          <DialogDescription>Upload your Memory here!</DialogDescription>
        </DialogHeader>

        <div className="scrollbar-custom space-y-6 overflow-y-auto">
          <ImageUploader />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={() => {}}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
