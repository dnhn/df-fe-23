import BookDetail from '@/src/components/Books/BookDetail'

interface IViewBook {
  params: { id: number }
}

export default function ViewBook({ params: { id } }: IViewBook) {
  return (
    <section className="mx-auto w-[60rem] max-w-full">
      <BookDetail id={id} />
    </section>
  )
}
