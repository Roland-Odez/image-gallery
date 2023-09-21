import { useSortable } from '@dnd-kit/sortable'
import { ImageType } from '../types/imageTypes'
import { CSS } from '@dnd-kit/utilities'

// import { LazyLoadImage } from 'react-lazy-load-image-component';


const ImageContainer = ({ image }: { image: ImageType }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: image.id,
        transition: {
            duration: 700,
            easing: ''
        }
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }


    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='h-48 cursor-pointer rounded-xl overflow-hidden relative border-2 border-gray-200'>
            <img
                src={image.url}
                alt='image galllery'
                className='absolute top-0 left-0 z-10 w-full h-full object-center block object-cover'
                draggable={true}
            />
        </div>
    )
}

export default ImageContainer