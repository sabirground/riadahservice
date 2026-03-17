import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Gallery table name
const GALLERY_TABLE = "gallery";

// Sample images for fallback
const SAMPLE_IMAGES = [
  {
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Grand Lobby Entrance",
    description: "Elegant marble flooring with contemporary design",
    category: "lobby",
    order_index: 1
  },
  {
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    title: "Premium Reception Area",
    description: "Sophisticated welcome area with gold accents",
    category: "reception",
    order_index: 2
  },
  {
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Executive Office Suite",
    description: "Modern workspace with panoramic city views",
    category: "office",
    order_index: 3
  },
  {
    image_url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    title: "Luxury Meeting Room",
    description: "State-of-the-art meeting facilities",
    category: "meeting",
    order_index: 4
  },
  {
    image_url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    title: "VIP Customer Lounge",
    description: "Exclusive waiting area with premium amenities",
    category: "lounge",
    order_index: 5
  },
  {
    image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    title: "Corporate Atrium",
    description: "Stunning architectural centerpiece",
    category: "atrium",
    order_index: 6
  },
  {
    image_url: "https://images.unsplash.com/photo-1600573472591-ee6981cf35de?w=800&q=80",
    title: "Business Center",
    description: "Full-service business facilities",
    category: "business",
    order_index: 7
  },
  {
    image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    title: "Conference Hall",
    description: "Large-scale event venue",
    category: "conference",
    order_index: 8
  },
  {
    image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    title: "Reception Desk",
    description: "Professional front desk service",
    category: "reception",
    order_index: 9
  },
  {
    image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    title: "Executive Suite",
    description: "Premium private office space",
    category: "office",
    order_index: 10
  },
  {
    image_url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    title: "Modern Interior",
    description: "Contemporary design excellence",
    category: "interior",
    order_index: 11
  },
  {
    image_url: "https://images.unsplash.com/photo-1600607688066-890987f18a86?w=800&q=80",
    title: "Corporate Interior",
    description: "Professional environment",
    category: "interior",
    order_index: 12
  }
];

// GET - Fetch all gallery images
export async function GET() {
  try {
    const { data, error } = await supabase
      .from(GALLERY_TABLE)
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      // If table doesn't exist, return sample images as fallback
      if (error.code === "42P01" || error.message.includes("does not exist")) {
        // Add IDs to sample images for editing support
        const sampleWithIds = SAMPLE_IMAGES.map((img, index) => ({
          ...img,
          id: `sample-${index + 1}`,
        }));
        return NextResponse.json(sampleWithIds);
      }
      return NextResponse.json(SAMPLE_IMAGES); // Return samples on error
    }

    // If no data, return sample images
    if (!data || data.length === 0) {
      // Add IDs to sample images for editing support
      const sampleWithIds = SAMPLE_IMAGES.map((img, index) => ({
        ...img,
        id: `sample-${index + 1}`,
      }));
      return NextResponse.json(sampleWithIds);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    // Add IDs to sample images for editing support
    const sampleWithIds = SAMPLE_IMAGES.map((img, index) => ({
      ...img,
      id: `sample-${index + 1}`,
    }));
    return NextResponse.json(sampleWithIds); // Return samples on exception
  }
}

// POST - Add new gallery image
export async function POST(request) {
  try {
    const body = await request.json();
    const { image_url, title, description, category, order_index } = body;

    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // Try to insert - if table doesn't exist, create it
    let { data, error } = await supabase
      .from(GALLERY_TABLE)
      .insert([
        {
          image_url,
          title: title || "",
          description: description || "",
          category: category || "general",
          order_index: order_index || 0,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    // If error indicates table doesn't exist, create it and retry
    if (error && (error.code === "42P01" || error.message.includes("does not exist"))) {
      
      // Create table using SQL
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${GALLERY_TABLE} (
          id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          image_url TEXT NOT NULL,
          title TEXT,
          description TEXT,
          category TEXT DEFAULT 'general',
          order_index INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE
        );
      `;
      
      // Try to create table using RPC
      const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      // If RPC doesn't work, try alternative approach
      if (createError) {
        // Table creation not available via API - return helpful error
        return NextResponse.json({ 
          error: "Gallery table does not exist. Please create it in Supabase SQL Editor with this SQL:\n\nCREATE TABLE gallery (\n  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n  image_url TEXT NOT NULL,\n  title TEXT,\n  description TEXT,\n  category TEXT DEFAULT 'general',\n  order_index INTEGER DEFAULT 0,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);"
        }, { status: 500 });
      }
      
      // Retry insert after table creation
      const retryResult = await supabase
        .from(GALLERY_TABLE)
        .insert([
          {
            image_url,
            title: title || "",
            description: description || "",
            category: category || "general",
            order_index: order_index || 0,
            created_at: new Date().toISOString(),
          },
        ])
        .select();
      
      if (retryResult.error) {
        return NextResponse.json({ error: retryResult.error.message }, { status: 500 });
      }
      
      if (!retryResult.data || retryResult.data.length === 0) {
        return NextResponse.json({ error: "Failed to create image entry" }, { status: 500 });
      }
      
      return NextResponse.json(retryResult.data[0], { status: 201 });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Failed to create image entry" }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

// DELETE - Remove gallery image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from(GALLERY_TABLE)
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}

// PUT - Update gallery image
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { image_url, title, description, category, order_index } = body;

    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // Check if this is a sample image (ID starts with "sample-")
    // If so, create a new entry instead of updating
    if (id.startsWith("sample-")) {
      const { data, error } = await supabase
        .from(GALLERY_TABLE)
        .insert([
          {
            image_url,
            title: title || "",
            description: description || "",
            category: category || "general",
            order_index: order_index || 0,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!data || data.length === 0) {
        return NextResponse.json({ error: "Failed to create image entry" }, { status: 500 });
      }

      return NextResponse.json(data[0], { status: 201 });
    }

    const { data, error } = await supabase
      .from(GALLERY_TABLE)
      .update({
        image_url,
        title: title || "",
        description: description || "",
        category: category || "general",
        order_index: order_index || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Image not found or failed to update" }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}
