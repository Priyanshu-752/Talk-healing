import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "./postcard";

export default function UserProfileActivityTab({ }) {
    return(
<Tabs defaultValue="Posts" className="w-[400px]">
  <TabsList className="gap-5">
    <TabsTrigger value="Posts">Posts</TabsTrigger>
    <TabsTrigger value="Comments">Comments</TabsTrigger>
    <TabsTrigger value="Saves">Saves</TabsTrigger>
  </TabsList>
  <TabsContent value="Posts">No posts avaialable here.</TabsContent>
  <TabsContent value="Comments">No comments avaialable here.</TabsContent>
  <TabsContent value="Saves">No saves avaialable here.</TabsContent>
</Tabs>
    );
};