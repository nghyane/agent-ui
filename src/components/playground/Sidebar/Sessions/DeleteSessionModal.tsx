import { type FC } from 'react'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DeleteSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<void>
  isDeleting: boolean
}

const DeleteSessionModal: FC<DeleteSessionModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-md rounded-2xl border-0 bg-white/95 backdrop-blur-md shadow-2xl">
      <DialogHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <Icon type="trash" size="lg" className="text-red-500" />
        </div>
        <DialogTitle className="text-xl font-semibold text-gray-900">
          Delete Session
        </DialogTitle>
        <DialogDescription className="text-gray-600 mt-2">
          This action cannot be undone. The session will be permanently deleted.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 rounded-xl border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isDeleting}
          className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-200 disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Deleting...
            </div>
          ) : (
            'Delete'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default DeleteSessionModal
