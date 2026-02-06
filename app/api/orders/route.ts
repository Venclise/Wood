import { connectDB } from "@/lib/db";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { customer, items } = body;

    if (!customer || !items || !items.length) {
      return NextResponse.json(
        { message: "Missing customer or items" },
        { status: 400 }
      );
    }

    const mappedItems = items.map((item: any) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      qty: item.qty,
      image: item.img,
    }));

    console.log(mappedItems)

    const total = mappedItems.reduce(
      (sum: number, item: any) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        lastName: customer.lastName,
        otherInfo: customer.otherInfo,
      },
      items: mappedItems,
      total,
    });

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      status: 1,      
      createdAt: -1,   
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch the orders" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Order id is required" },
        { status: 400 }
      );
    }

   
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }


    if (order.status === "delivered") {
      await Promise.all(
        order.items.map((item: any) =>
          Product.findByIdAndUpdate(item.productId, {
            $inc: { sold: item.qty },
          })
        )
      );
    }

   
    order.status = "delivered";
    await order.save();

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}