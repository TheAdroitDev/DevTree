import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db('Devtree');
  const collection = db.collection("links");

  // If The handle is already claimed, you cannot claim devtree 
  const doc = await collection.findOne({ handle: body.handle })
  if (doc) {
    return Response.json({
      message: 'This DevTree Already Exists!',
      success: false,
      error: true,
      result: null
    })
  }

  const response = await collection.insertOne(body)

  console.log(body)
  return Response.json({
    result: response,
    message: 'DevTree Created Successfully!',
    success: true,
    error: false
  })
}