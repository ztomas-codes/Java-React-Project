'use client';
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, User, BookOpen } from 'lucide-react'
import { useArticlesQuery } from '@/query/useArticlesQuery'

export default function Home() {
  const {data: articles} = useArticlesQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="border-b border-gray-700 backdrop-blur-sm bg-gray-900/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">BlogSite</Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search blogs..." 
                className="w-64 bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700 focus:border-purple-500"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <Button variant="ghost" className="hover:bg-gray-800">
              <BookOpen className="mr-2 h-4 w-4" /> Blogs
            </Button>
            <Button variant="ghost" className="hover:bg-gray-800">
              <User className="mr-2 h-4 w-4" /> Login
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">Register</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Recent Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((blog) => (
            <Card key={blog.slug} className="bg-gray-800 border-gray-700 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="relative h-48">

              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-100">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">By {blog.user.username}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-gray-400">{blog.date}</p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
