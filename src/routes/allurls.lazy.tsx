import Header from '@/components/molecules/Header'
import ReactTable from '@/components/molecules/ReactTable'
import { createLazyFileRoute } from '@tanstack/react-router'
import useGetAllShortenedUrls from '@/services/useGetAllShortenedUrls'
import useColumnDef from '@/hooks/useColumnDef'
import { useState } from 'react'
import QRPopover from '@/components/molecules/QRDialog'

export const Route = createLazyFileRoute('/allurls')({
  component: AllUrls,
})

function AllUrls() {
  const { data: allUrls, ...fetchProps } = useGetAllShortenedUrls()

  const { columns, urlQr, openQr, setOpenQr } = useColumnDef()

  return (
    <main>
      <Header title="All URLs" />
      <hr className="mb-10" />
      {fetchProps.isLoading && <p>Loading...</p>}
      <div className="px-8">
        {allUrls && (
          <ReactTable
            columns={columns}
            data={allUrls}
            sorting={[{ id: 'createdAt', desc: true }]}
          />
        )}
      </div>
      <QRPopover url={urlQr} open={openQr} setOpen={setOpenQr} />
    </main>
  )
}
