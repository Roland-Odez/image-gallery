import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { imageData } from '../lib/images'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { app } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import ImageContainer from '../components/ImageContainer'
import { useState, useEffect } from 'react'
import { ImageType } from '../types/imageTypes'
import Navbar from '../components/Navbar'


export default function Home() {
    const [images, setImages] = useState<ImageType[]>([...imageData])
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate('/login')
            auth.signOut()
        }
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyImage = [...imageData]
        const searchResult = copyImage.filter((image, id) => {
            let contain = false;
            image.tag.forEach((el) => {
                if (el === e.currentTarget.value) {
                    contain = true;
                }
            })
            return contain
        })
        if (e.currentTarget.value === '') {
            setImages(imageData)
        } else {

            setImages(searchResult)
        }
        // setTimeout(() => (setImages(searchResult)), 2000)

    }

    const onDragEnd = (e: DragEndEvent) => {
        // console.log({
        //     s: e.active?.data.current?.sortable.index,
        //     ed: e.over?.data.current?.sortable.index
        // })
        const imageItems = [...images]
        const dragedImage = imageItems.splice(Number(e.active?.data.current?.sortable.index) - 1, 1)[0]
        imageItems.splice(Number(e.over?.data.current?.sortable.index) - 1, 0, dragedImage)
        setImages(imageItems)
    }

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 3000)
    }, [])

    return (
        <>
            <Navbar handleSearch={handleSearch} />
            <main className="overflow-y-auto h-screen pb-20 max-w-[1124px] mx-auto">
                {
                    show ?

                        <section
                            className='px-3 py-4 grid  grid-cols-custom gap-4'>
                            <DndContext collisionDetection={closestCenter} onDragEnd={(e) => onDragEnd(e)}>
                                <SortableContext items={images} strategy={rectSortingStrategy}>
                                    {
                                        images.map((image, idx) => (
                                            <ImageContainer key={image?.id} image={image} />

                                        ))}
                                </SortableContext>
                            </DndContext>
                        </section>
                        :
                        <div className='flex items-center justify-center w-full h-screen'>
                            <p className='text-lg font-pacific font-bold'>Loading...</p>
                        </div>
                }
            </main>
        </>
    )
}
